import { Identifier } from '@common/interfaces'

export interface DeleteProductUseCase {
  execute(pathParameters: Identifier): Promise<void>
}
