import { FilterUserDto } from 'src/users/dto/filter-user.dto';
import { addHour } from './addHours';
import { QueryUserDTO } from 'src/users/dto/query-user.dto';

export function generateQueryForUser(filters: FilterUserDto): any {
  const fields = {
    createdAt: () => {
      const initialDate = new Date(filters.createdat);
      const finalDate = addHour(new Date(filters.createdat), 1);
      return {
        createdAt: {
          gte: initialDate,
          lte: finalDate,
        },
      };
    },
    name: () => ({
      name: {
        contains: filters.name,
      },
    }),
    email: () => ({
      email: {
        contains: filters.email,
      },
    }),
    rg: () => ({
      rg: {
        rg: filters.rg,
      },
    }),
    cpf: () => ({
      cpf: filters.cpf,
    }),
  };

  const keysFields = Object.keys(fields);

  let query: QueryUserDTO;

  // eslint-disable-next-line @typescript-eslint/ban-types
  let queryBuilder: Function;

  for (const filter in filters) {
    if (filters[filter] && keysFields.includes(filter)) {
      queryBuilder = fields[filter];

      if (query) {
        return Object.assign(query, queryBuilder());
      }

      query = queryBuilder();
    }
  }

  return query;
}