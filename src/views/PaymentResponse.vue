<template>
  <div class="about">
    <h1>Su pago se ha realizado exitosamente</h1>
    <p>Nº de transaccion: {{ transactionId }}</p>
    <p>Nº de orden: {{ orderId }}</p>
    <p>Estado: {{ status }}</p>
    <p>Monto total: S/. {{ totalAmount }}</p>
    <p>Fecha de creación: {{ createdDate }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentResponse: {},
      transactionId : '',
      orderId: '',
      status: '',
      totalAmount: 0,
      createdDate: ''
    }
  },

  mounted() {
    this.paymentResponse = JSON.parse(this.$route.query['kr-answer']);
    this.transactionId = this.paymentResponse.transactions[0].uuid;
    this.orderId = this.paymentResponse.orderDetails.orderId;
    this.status = this.paymentResponse.orderStatus === 'PAID' ? 'Pagado' : '-';
    this.totalAmount = this.paymentResponse.transactions[0].amount;
    this.totalAmount = this.formatDecimal(this.totalAmount);
    this.createdDate = this.paymentResponse.transactions[0].creationDate
  },

  methods: {
    formatDecimal: function(num) {
      const numData = num.toString();
      let string1 = numData.slice(0, -2);
      let string2 = numData.slice(-2);
      return string1 + '.' + string2;
    }
  }
}
</script>
