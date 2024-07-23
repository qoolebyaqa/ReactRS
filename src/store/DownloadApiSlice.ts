/* import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { GlobalStateType, IPokeItem } from "../types";

const convertToCSV = (data: IPokeItem[]): string => {
  if (!data.length) {
    return '';
  }

  const csvRows: string[] = [];

  // Получаем заголовки
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(','));

  // Формируем строки данных
  for (const row of data) {
    const values = headers.map(header => {
      const escaped = ('' + row[header as keyof IPokeItem]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
};

const customBaseQuery: BaseQueryFn<string, unknown, unknown> = async (_endpoint, _api, _extraOptions) => {
  // Эмулируем глобальное состояние для примера
  const selectedPokemons = useSelector((state: GlobalStateType) => state.PokeStore.selectedItems);
  try {
    const data = selectedPokemons
    return { data }
  } catch (error) {
    return { error }
  }
};

export const DownloadApiSlice = createApi({
  reducerPath: 'DownloadApiSlice',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    downloadCSV: builder.mutation<void, void>({
      queryFn: async (_arg, { getState }) => {
        try {
          // Доступ к состоянию
          const selectedPokemons = (getState() as GlobalStateType).PokeStore.selectedItems;
          const csv = convertToCSV(selectedPokemons);
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.setAttribute('href', url);
          link.setAttribute('download', 'pokemons.csv');
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return { data: undefined };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error } };
        }
      }
    })
  })
});

export const { useDownloadCSVMutation } = DownloadApiSlice;
 */