import { DeleteProductDTO } from '@application/dtos/product'
import { EmptyFiller } from '@common/constants'
import { StatusCode, ErrorName } from '@common/enums'
import { InvalidParamError } from '@common/errors'
import { DeleteCategoryMock, InputProductParamMock } from '@mocks/products'
import { InvalidParamStub } from '@stubs/exceptions'

describe(`[DTO's] Delete Product DTO`, () => {
  it('should delete an instance of DeleteProductDTO', () => {
    const input: DeleteProductDTO = new DeleteProductDTO(InputProductParamMock)

    expect(input).toBeInstanceOf(DeleteProductDTO)
    expect(input).toEqual(DeleteCategoryMock)
  })

  it('should throw an error if id is empty string', () => {
    expect(() => new DeleteProductDTO(EmptyFiller)).toThrow(InvalidParamStub)
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })

  it('should throw an error if id is null', () => {
    expect(() => new DeleteProductDTO(null as any)).toThrow(InvalidParamStub)
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })

  it('should throw an error if id is undefined', () => {
    expect(() => new DeleteProductDTO(undefined as any)).toThrow(
      InvalidParamStub
    )
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })
})
