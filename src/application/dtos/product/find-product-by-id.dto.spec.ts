import { FindProductByIdDTO } from '@application/dtos/product'
import { EmptyFiller } from '@common/constants'
import { StatusCode, ErrorName } from '@common/enums'
import { InvalidParamError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { InputProductParamMock, FindProductByIdMock } from '@mocks/products'
import { InvalidParamStub } from '@stubs/exceptions'

describe(`[DTO's] Find Product By Id DTO`, () => {
  it('should call with the correct id', () => {
    const input = new FindProductByIdDTO(InputProductParamMock)

    expect(input).toBeInstanceOf(FindProductByIdDTO)
    expect(input).toEqual(FindProductByIdMock)
  })

  it('should throw an error if id is empty string provided', () => {
    const httpException: HttpException = InvalidParamStub

    expect(() => new FindProductByIdDTO(EmptyFiller)).toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.InvalidParameters)
    expect(httpException.message).toBe(InvalidParamError())
  })

  it('should throw an error if id is null provided', () => {
    const httpException: HttpException = InvalidParamStub

    expect(() => new FindProductByIdDTO(null as any)).toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.InvalidParameters)
    expect(httpException.message).toBe(InvalidParamError())
  })

  it('should throw an error if id is undefined provided', () => {
    const httpException: HttpException = InvalidParamStub

    expect(() => new FindProductByIdDTO(undefined as any)).toThrow(
      httpException
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.InvalidParameters)
    expect(httpException.message).toBe(InvalidParamError())
  })
})
