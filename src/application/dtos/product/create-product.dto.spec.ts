import { CreateProductDTO } from '@application/dtos/product'
import {
  ProductUndefinedPropsAssert,
  ProductEmptyPropsAssert,
  ProductStringPropsAssert
} from '@assertions/products'
import { ErrorName, StatusCode, Type } from '@common/enums'
import {
  IncorrectFieldTypeError,
  InvalidBodyError,
  ValueIncorrectError
} from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Field, Size } from '@domain/enums'
import {
  InputProductBodyMock,
  InputProductPriceMock,
  InputProductSizeMock
} from '@mocks/products'
import {
  InvalidBodyStub,
  InvalidFieldTypeStub,
  InvalidValueStub
} from '@stubs/exceptions'

describe(`[DTO's] Create Product DTO`, () => {
  it('should create a new product with all fields', () => {
    const body: CreateProductDTO = new CreateProductDTO(
      InputProductBodyMock.name,
      InputProductBodyMock.description,
      InputProductBodyMock.category_id,
      InputProductBodyMock.price,
      InputProductBodyMock.size as Size
    )
    expect(body).toBeInstanceOf(CreateProductDTO)
    expect(body.name).toBe(InputProductBodyMock.name)
    expect(body.description).toBe(InputProductBodyMock.description)
    expect(body.category_id).toBe(InputProductBodyMock.category_id)
    expect(body.price).toBe(InputProductBodyMock.price)
    expect(body.size).toBe(Size.Medium)
  })

  it.each(ProductUndefinedPropsAssert)(
    `should throw if $prop is undefined (not provided)`,
    ({ input }) => {
      const { name, description, category_id, price, size } = input
      const httpException: HttpException = InvalidBodyStub

      expect(
        () => new CreateProductDTO(name, description, category_id, price, size)
      ).toThrow(httpException)

      expect(httpException.statusCode).toBe(StatusCode.BadRequest)
      expect(httpException.name).toBe(ErrorName.InvalidBody)
      expect(httpException.message).toBe(InvalidBodyError())
    }
  )

  it.each(ProductEmptyPropsAssert)(
    `should throw if $prop is undefined (not provided)`,
    ({ input }) => {
      const { name, description, category_id, price, size } = input
      const httpException: HttpException = InvalidBodyStub

      expect(
        () =>
          new CreateProductDTO(
            name,
            description,
            category_id,
            price as any,
            size as any
          )
      ).toThrow(httpException)

      expect(httpException.statusCode).toBe(StatusCode.BadRequest)
      expect(httpException.name).toBe(ErrorName.InvalidBody)
      expect(httpException.message).toBe(InvalidBodyError())
    }
  )

  it.each(ProductStringPropsAssert)(
    `should throw if $prop not string`,
    ({ input, field, type }) => {
      const { name, description, category_id, price, size } = input
      const httpException: HttpException = InvalidFieldTypeStub(field, type)

      expect(
        () => new CreateProductDTO(name, description, category_id, price, size)
      ).toThrow(httpException)

      expect(httpException.statusCode).toBe(StatusCode.BadRequest)
      expect(httpException.name).toBe(ErrorName.InvalidParameters)
      expect(httpException.message).toBe(IncorrectFieldTypeError(field, type))
    }
  )

  it('should throw if price is not number', () => {
    const httpException: HttpException = InvalidFieldTypeStub(
      Field.Price,
      Type.number
    )

    expect(
      () =>
        new CreateProductDTO(
          InputProductBodyMock.name,
          InputProductBodyMock.description,
          InputProductBodyMock.category_id,
          InputProductPriceMock as any,
          InputProductBodyMock.size as Size
        )
    ).toThrow(httpException)

    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.InvalidParameters)
    expect(httpException.message).toBe(
      IncorrectFieldTypeError(Field.Price, Type.number)
    )
  })

  it('should throw if size is not valid', () => {
    const httpException: HttpException = InvalidValueStub(Field.Size)

    expect(
      () =>
        new CreateProductDTO(
          InputProductBodyMock.name,
          InputProductBodyMock.description,
          InputProductBodyMock.category_id,
          InputProductBodyMock.price,
          InputProductSizeMock as any
        )
    ).toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.InvalidParameters)
    expect(httpException.message).toBe(ValueIncorrectError(Field.Size))
  })
})
