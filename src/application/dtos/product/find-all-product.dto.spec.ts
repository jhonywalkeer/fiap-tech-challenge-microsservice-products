import { FindAllProductsDTO } from '@application/dtos/product'
import { LimitDefault, PageDefault } from '@common/constants'
import { ErrorName, Ordenation, StatusCode } from '@common/enums'
import { ValueIncorrectError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'
import {
  PageMock,
  LimitMock,
  SortMock,
  OrderMock,
  InvalidOrderMock
} from '@mocks/pagination'
import { InvalidValueStub } from '@stubs/exceptions'

describe(`[DTO's] Find All Products DTO`, () => {
  it('should create an instance of FindAllProductsDTO', () => {
    const input: FindAllProductsDTO = new FindAllProductsDTO(
      PageMock,
      LimitMock,
      SortMock,
      OrderMock
    )

    expect(input).toBeInstanceOf(FindAllProductsDTO)
    expect(input.page).toBe(PageMock)
    expect(input.limit).toBe(LimitMock)
    expect(input.sort).toBe(SortMock)
    expect(input.order).toBe(OrderMock)
  })

  it('should create an instance of FindAllProductsDTO with default values', () => {
    const input: FindAllProductsDTO = new FindAllProductsDTO()

    expect(input).toBeInstanceOf(FindAllProductsDTO)
    expect(input.page).toBe(PageDefault)
    expect(input.limit).toBe(LimitDefault)
    expect(input.sort).toBeUndefined()
    expect(input.order).toBe(Ordenation.ASC)
  })

  it('should return the default values if no page informed', () => {
    const input: FindAllProductsDTO = new FindAllProductsDTO(
      undefined,
      LimitMock,
      undefined,
      OrderMock
    )

    expect(input.page).toBe(PageDefault)
    expect(input.limit).toBe(LimitDefault)
    expect(input.sort).toBeUndefined()
    expect(input.order).toBe(Ordenation.ASC)
  })

  it('should return the default values if no limit informed', () => {
    const input: FindAllProductsDTO = new FindAllProductsDTO(
      PageMock,
      undefined,
      undefined,
      OrderMock
    )

    expect(input.page).toBe(PageDefault)
    expect(input.limit).toBe(LimitDefault)
    expect(input.sort).toBeUndefined()
    expect(input.order).toBe(Ordenation.ASC)
  })

  it('should throw an exception if the order parameter is invalid', () => {
    const httpException: HttpException = InvalidValueStub(Field.Order)

    expect(() => {
      new FindAllProductsDTO(PageMock, LimitMock, SortMock, InvalidOrderMock)
    }).toThrow(httpException)

    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.InvalidParameters)
    expect(httpException.message).toBe(ValueIncorrectError(Field.Order))
  })
})
