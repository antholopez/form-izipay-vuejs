<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container">
      <div id="myPaymentForm"></div>
    </div>
    <div>{{ promiseError }}</div>
  </div>
</template>

<script>
/* import embedded-form-glue library */
import KRGlue from "@lyracom/embedded-form-glue";
import axios from 'axios';

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      promiseError: "",
      formToken : ""
    };
  },

  async mounted() {
    const endpoint = "https://static.micuentaweb.pe/";
    const publicKey = "60203431:testpublickey_iHmw8eEwqMjcc2zA7Go14FxQlScyQKOrKECrXNA82YS6C";

    await this.generatedFormToken();

    KRGlue.loadLibrary(endpoint, publicKey) /* Load the remote library */
      .then(({ KR }) =>
        KR.setFormConfig({
          formToken: this.formToken,
          "kr-language": "es-ES",
          'kr-get-url-success': 'http://localhost:8080/payment-response'
        })
      )
      .then(({ KR }) =>
        KR.addForm("#myPaymentForm")
      ) /* create a payment form */
      .then(({ KR, result }) => {
          console.log('Viendo el result: ', result)
          KR.showForm(result.formId)
        }
      ) /* show the payment form */
      .catch(
        error => (this.promiseError = error + " (see console for more details)")
      );
  },

  methods: {
    encoded: function() {
      let user = '60203431';
      let pass = 'testpassword_4GVdJk52pmo1sleHRfT0f2wVnjUJJi9lw9EmtrAy6lkLB';
      let text = user + ':' + pass;
      return Buffer.from(text).toString('base64')
    },

    generatedFormToken: async function() {
      const url = 'http://localhost:8080/api/Charge/CreatePayment/'; // Url del servicio mi cuenta web
      const token = this.encoded();

      const headers = {
        Authorization: `Basic ${token}`,
      };
      let paymentData = {
        amount: 5000,
        currency: 'PEN',
        orderId: 'myOrderABC804',
        customer: {
          email: 'sample@example.com',
        },
      };

      try {
        const { data } = await axios.post(url, paymentData, { headers });
        this.formToken  = data.answer.formToken

      } catch (error) {
        console.log('Viendo el error...', error.message);
      }    
    },

    generateTransaction: async function() {
      const url = "http://localhost:3000/embedded-form/generate-form-token";

      try {
        const { data } = await axios.post(url, {});
        console.log('Viendo la respuesta del servicio: ', data)
      } catch (error) {
        console.log('Viendo el error...', error);
      } 
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>