import { StatusCode, ErrorName } from '@common/enums'
import { ExistsError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'

export const ExistsResourceStub = (field: string): HttpException => {
  return new HttpException(
    StatusCode.Conflict,
    ErrorName.ResourceAlreadyExists,
    ExistsError(field)
  )
}
