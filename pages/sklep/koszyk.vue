<template>
  <div class="lg:w-1/2 mx-auto">
    <table class="pt-20">
      <thead>
        <tr>
          <th></th>
          <th>Produkt</th>
          <th>Cena</th>
          <th>Ilość</th>
          <th>Suma</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data">
          <td><img width="40" src="https://files.stripe.com/links/MDB8YWNjdF8xSlBTc05LaDRTOWl2TlByfGZsX3Rlc3Rfc3dhbFQxWGJvUG1XSUR0MktTc2pMRHQ000uGi5EDFw"></td>
          <td>{{ row.name }}</td>
          <td>{{ row.price }} zł</td>
          <td><input type="number" v-model="row.quantity" min="1" max="10"> </td>
          <td>{{ Math.round(row.price * row.quantity * 100) / 100 }} zł</td>
        </tr>
      </tbody>
    </table>
<!--    <a-row type="flex" justify="center">-->
<!--      <a-col :span="12">-->
<!--        <a-table :columns="columns" :data-source="data" :pagination="false">-->
<!--          <span slot="price" slot-scope="text">-->
<!--            {{ text }} zł-->
<!--          </span>-->
<!--          <span slot="quantity" slot-scope="text, record, index">-->
<!--            <a-input-number v-model="data[index].quantity" />-->
<!--          </span>-->
<!--          <span slot="sum" slot-scope="text, record, index">-->
<!--            {{ Math.round(data[index].price * data[index].quantity * 100) / 100 }} zł-->
<!--          </span>-->
<!--        </a-table>-->
<!--      </a-col>-->
<!--    </a-row>-->
<!--    <a-row type="flex" style="margin-top: 50px">-->
<!--      <a-col :span="4" :offset="14">-->
<!--        <a-row type="flex" justify="space-between">-->
<!--          <a-col>-->
<!--            <b>Wartość zamówienia</b>-->
<!--          </a-col>-->
<!--          <a-col>-->
<!--            {{ Math.round(total * 100) / 100 }} zł-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--      </a-col>-->
<!--    </a-row>-->
<!--    <a-row type="flex" style="margin-top: 50px">-->
<!--      <a-col :span="4" :offset="14">-->
<!--        <a-button block>Dostawa i płatność</a-button>-->
<!--      </a-col>-->
<!--    </a-row>-->
  </div>
</template>
<script>
const columns = [
  {
    title: 'Produkt',
    dataIndex: 'name',
    key: 'name',
    width: '30%',
  },
  {
    title: 'Cena',
    dataIndex: 'price',
    key: 'price',
    scopedSlots: { customRender: 'price' },
    width: '30%',
  },
  {
    title: 'Ilość',
    key: 'quantity',
    dataIndex: 'quantity',
    scopedSlots: { customRender: 'quantity' },
    width: '20%',
  },
  {
    title: 'Suma',
    key: 'sum',
    dataIndex: 'sum',
    scopedSlots: { customRender: 'sum' },
    width: '20%',
  },
];

const data = [
  {
    name: 'Planer osobisty',
    price: 32.99,
    quantity: 3,
    key: '1',
  },
  {
    name: 'Planer osobisty',
    price: 32.99,
    quantity: 3,
    key: '2',
  },
  {
    name: 'Planer osobisty',
    price: 32.99,
    quantity: 3,
    key: '3',
  },
];

export default {
  data() {
    return {
      data,
      columns,
      quantity: 0,
      total: 0,
    };
  },
  created() {
    this.calculateTotal()
  },
  methods: {
    calculateTotal() {
      this.total = this.data.reduce((sum, { price, quantity }) => sum + quantity * price, 0);
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.calculateTotal()
      }
    }
  }
};
</script>

<style lang="scss">
  table {
    width: 100%;
    border-collapse: collapse;
    th {
      text-transform: uppercase;
      border-bottom: 1px solid grey;
      width: 20%;
    }
    th:first-of-type {
      width: 10%;
    }
    th, td {
      text-align: left;
      border-color: rgba(173,176,182,0.3);
    }

    input[type=number] {
      width: 40px;
    }
  }
</style>
