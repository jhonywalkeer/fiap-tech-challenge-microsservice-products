import { Gateway } from '@application/protocols/http'
import {
  CreateProductRepository,
  FindProductByConditionRepository
} from '@application/repositories/product'
import { CreateProductUC } from '@application/usecases/product'
import {
  ReceiveMessageCommandOutput,
  SendMessageCommandOutput
} from '@aws-sdk/client-sqs'
import { StatusCode, ErrorName, Operation } from '@common/enums'
import { ExistsError, NotOccurredError } from '@common/errors'
import { QueueResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity, ProductEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { CreateProduct } from '@domain/interfaces/product'
import { CreateProductUseCase } from '@domain/usecases/product'
import { CreatedProductMock, InputProductBodyMock } from '@mocks/products'
import { ReceiveMessageOutput, SendMessageMock } from '@mocks/queue.mock'
import { ExistsResourceStub, NotOccurredStub } from '@stubs/exceptions'

describe('[Use Cases] Create Product Use Case', () => {
  let createProductUC: CreateProductUseCase
  let findProductByConditionRepository: jest.Mocked<FindProductByConditionRepository>
  let sendEvent: jest.Mocked<Gateway<CategoryEntity>>
  let readMessage: jest.Mocked<Gateway<QueueResponse<CategoryEntity>>>
  let createProductRepository: jest.Mocked<CreateProductRepository>
  let logger: jest.SpyInstance

  const sendMessageOutput: SendMessageCommandOutput = SendMessageMock
  const receiveMessageOutput: ReceiveMessageCommandOutput = ReceiveMessageOutput

  beforeEach(() => {
    findProductByConditionRepository = {
      findByCondition: jest.fn()
    } as unknown as jest.Mocked<FindProductByConditionRepository>
    sendEvent = {
      execute: jest.fn()
    }
    readMessage = {
      execute: jest.fn()
    }
    createProductRepository = {
      create: jest.fn()
    } as unknown as jest.Mocked<CreateProductRepository>

    createProductUC = new CreateProductUC(
      findProductByConditionRepository,
      sendEvent,
      readMessage,
      createProductRepository
    )

    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create a product', async () => {
    findProductByConditionRepository.findByCondition.mockResolvedValue(null)
    sendEvent.execute.mockResolvedValue(sendMessageOutput as any)
    readMessage.execute.mockResolvedValue(receiveMessageOutput as any)
    createProductRepository.create.mockResolvedValue(CreatedProductMock)

    const result: ProductEntity = await createProductUC.execute(
      InputProductBodyMock as CreateProduct
    )

    expect(createProductUC.execute).toBeInstanceOf(Function)
    expect(
      findProductByConditionRepository.findByCondition
    ).toHaveBeenCalledTimes(1)
    expect(
      findProductByConditionRepository.findByCondition
    ).toHaveBeenCalledWith(InputProductBodyMock)
    expect(sendEvent.execute).toHaveBeenCalledTimes(1)
    expect(readMessage.execute).toHaveBeenCalledTimes(1)
    expect(createProductRepository.create).toHaveBeenCalledTimes(1)
    expect(logger).toHaveBeenCalledWith('[CreateProductUC.execute]')
    expect(result).toEqual(CreatedProductMock)
  })

  it('should generate an error if the user already exists when searching by name', async () => {
    findProductByConditionRepository.findByCondition.mockResolvedValue([
      CreatedProductMock
    ])

    const httpException: HttpException = ExistsResourceStub(Field.Product)

    expect(() =>
      createProductUC.execute(InputProductBodyMock as CreateProduct)
    ).rejects.toThrow(httpException)

    expect(httpException.statusCode).toBe(StatusCode.Conflict)
    expect(httpException.name).toBe(ErrorName.ResourceAlreadyExists)
    expect(httpException.message).toBe(ExistsError(Field.Product))
  })

  it('should generate an error if the category not found', async () => {
    findProductByConditionRepository.findByCondition.mockResolvedValue(null)
    sendEvent.execute.mockResolvedValue(sendMessageOutput as any)
    readMessage.execute.mockResolvedValue(null as any)

    const httpException: HttpException = NotOccurredStub(
      StatusCode.NotFound,
      ErrorName.NotFoundInformation,
      Operation.Find,
      Field.Category
    )

    expect(() =>
      createProductUC.execute(InputProductBodyMock as CreateProduct)
    ).rejects.toThrow(httpException)

    expect(httpException.statusCode).toBe(StatusCode.NotFound)
    expect(httpException.name).toBe(ErrorName.NotFoundInformation)
    expect(httpException.message).toBe(
      NotOccurredError(Operation.Find, Field.Category)
    )
  })
})
