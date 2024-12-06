export const InputCategoryParamMock = '25097f13-505f-4236-9901-f9998add2b31'

export const InputCategoryBodyMock = {
  name: 'Categoria A',
  description: 'Descrição da categoria nomeada como A'
}

export const CreateCategoryMock = InputCategoryBodyMock

export const CreatedCategoryMock = {
  id: InputCategoryParamMock,
  created_at: new Date(),
  updated_at: new Date(),
  ...CreateCategoryMock
}
