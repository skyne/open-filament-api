export const getFilamentSchema = {
  schema: {
    tags: ['Filament'],
    summary: 'Get Filament',
    description: 'Get Filament by id',
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
    },
  },
};
