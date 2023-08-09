<script setup>
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useVueTable,
  createColumnHelper,
} from "@tanstack/vue-table";

import { makeData } from "./makedata.js";
import { ref } from "vue";

const defaultData = makeData(1000);

// pagination
const goToPageNumber = 1;
const pageSizes = [10, 20, 30, 40, 50];

// console.log(defaultData)

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    // footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => info.getValue(),
    header: "Last Name",
    // footer: (props) => props.column.header,
  }),
  columnHelper.accessor("age", {
    header: "Age",
    // footer: (props) => props.column.header,
  }),
  columnHelper.accessor("visits", {
    header: "Visits",
    // footer: (props) => props.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    // footer: (props) => props.column.id,
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
    // footer: (props) => props.column.id,
  }),
];

const data = ref(defaultData);

const rerender = () => {
  data.value = defaultData;
};

const showPagination = () => {
  console.log(table.getState().pagination);
};

const table = useVueTable({
  get data() {
    return data.value;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});
</script>

<template>
  <div class="p-2 w-fit">
    <table>
      <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </td>
        </tr>
      </tbody>
      <!-- <tfoot>
        <tr v-for="footerGroup in table.getFooterGroups()" :key="footerGroup.id">
          <th v-for="header in footerGroup.headers" :key="header.id" :colSpan="header.colSpan">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.footer"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </tfoot> -->
    </table>
    <div class="h-4" />
    <div class="flex w-full justify-end space-x-2">
      <button @click="showPagination" class="px-1 py-0.5 border border-gray-300 rounded bg-gray-100">One</button>
      <button class="px-1 py-0.5 border border-gray-300 rounded bg-gray-100">Two</button>
      <div>Page {{ table.getState().pagination.pageIndex + 1 }} of {{ table.getPageCount() }}</div>
    </div>
    <button @click="rerender" class="border p-2">Rerender</button>
  </div>
</template>

<style scoped lang="postcss">
table {
  @apply w-full text-base text-left text-gray-800 dark:text-gray-400;
}

thead {
  @apply text-sm text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400;
}

thead th {
  @apply px-3 py-2;
}

tbody tr {
  @apply even:bg-gray-100 border-b border-gray-200 hover:bg-gray-200;
}

tbody td {
  @apply px-3 py-2;
}
</style>
