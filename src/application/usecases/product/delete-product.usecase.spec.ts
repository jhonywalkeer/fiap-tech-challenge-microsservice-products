import {
  DeleteProductRepository,
  FindProductByIdRepository
} from '@application/repositories/product'
import { DeleteProductUC } from '@application/usecases/product'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { Field } from '@domain/enums'
import { DeleteProductUseCase } from '@domain/usecases/product'
import { CreatedProductMock, InputProductParamMock } from '@mocks/products'
import { NotOccurredStub } from '@stubs/exceptions'

describe('[Use Cases] Delete Product Use Case', () => {
  let deleteProductUC: DeleteProductUseCase
  let findProductByIdRepository: jest.Mocked<FindProductByIdRepository>
  let deleteProductRepository: jest.Mocked<DeleteProductRepository>
  let logger: jest.SpyInstance

  const pathParameters: Identifier = { id: InputProductParamMock }

  beforeEach(() => {
    findProductByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindProductByIdRepository>
    deleteProductRepository = {
      delete: jest.fn()
    } as unknown as jest.Mocked<DeleteProductRepository>

    deleteProductUC = new DeleteProductUC(
      findProductByIdRepository,
      deleteProductRepository
    )

    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return void if product was deleted', async () => {
    findProductByIdRepository.findById.mockResolvedValue(CreatedProductMock)
    deleteProductRepository.delete.mockResolvedValueOnce()

    await expect(
      deleteProductUC.execute(pathParameters)
    ).resolves.toBeUndefined()

    expect(findProductByIdRepository.findById).toHaveBeenCalledTimes(1)
    expect(findProductByIdRepository.findById).toHaveBeenCalledWith(
      pathParameters
    )
    expect(deleteProductRepository.delete).toHaveBeenCalledTimes(1)
    expect(deleteProductRepository.delete).toHaveBeenCalledWith(pathParameters)
    expect(logger).toHaveBeenCalledTimes(1)
    expect(logger).toHaveBeenCalledWith('[DeleteProductUC.execute]')
  })

  it('should generate an error if the product does not exist', async () => {
    findProductByIdRepository.findById.mockResolvedValue(null)

    const httpException: HttpException = NotOccurredStub(
      StatusCode.NotFound,
      ErrorName.NotFoundInformation,
      Operation.Delete,
      Field.Product
    )

    await expect(deleteProductUC.execute(pathParameters)).rejects.toThrow(
      httpException
    )

    expect(httpException.statusCode).toBe(StatusCode.NotFound)
    expect(httpException.name).toBe(ErrorName.NotFoundInformation)
    expect(httpException.message).toBe(
      NotOccurredError(Operation.Delete, Field.Product)
    )
  })
})
