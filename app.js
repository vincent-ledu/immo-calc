if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then(() => console.log("registered service worker!"));
}

const ASSET_TYPE = {
  OLD: 0,
  NEW: 1,
};

const NOTARY_PERCENT_OLD = 7.8;
const NOTARY_PERCENT_NEW = 3.6;

const app = new Vue({
  el: "#app",
  data: {
    net_seller_price: 685000,
    agency_fees: 0,
    asset_type: ASSET_TYPE.OLD,

    main_loan_tx: 1.2,
    main_loan_duration: 300,

    relay_loan: 0,
    relay_loan_tx: 1.35,
    relay_loan_duration: 24,
    asset_sell_price: 410000,
    percent_sell_price: 70,

    personnal_money: 600000,
    income: 5500,
    other_expense: 0,

    percent_insurance_mortgagor: 100,
    tx_insurance_mortgagor: 0.2,
    percent_insurance_comortgagor: 100,
    tx_insurance_comortgagor: 0.15,
  },
  computed: {
    total_cost_main_loan: function () {
      return (
        (this.monthly_payment +
          this.mortgagor_monthly_payment_insurance_main_loan +
          this.comortgagor_monthly_payment_insurance_main_loan) *
          this.main_loan_duration -
        this.main_loan_amount
      );
    },
    indebtment_rate: function () {
      return (
        Math.round(
          ((this.monthly_payment +
            this.other_expense +
            this.mortgagor_monthly_payment_insurance_main_loan +
            this.comortgagor_monthly_payment_insurance_main_loan) /
            this.income) *
            100 *
            100
        ) / 100
      );
    },
    monthly_payment: function () {
      const payment =
        (this.main_loan_amount * (this.main_loan_tx / 1200)) /
        (1 - (1 + this.main_loan_tx / 1200) ** -this.main_loan_duration);
      return Math.round(payment * 100) / 100;
    },
    notary_fees_percent: function () {
      return this.asset_type === ASSET_TYPE.OLD
        ? NOTARY_PERCENT_OLD
        : NOTARY_PERCENT_NEW;
    },
    notary_fees: function () {
      return Math.round(this.net_seller_price * this.notary_fees_percent) / 100;
    },
    main_loan_amount: function () {
      let amount =
        parseFloat(this.net_seller_price) +
        parseFloat(this.notary_fees) +
        parseFloat(this.agency_fees) -
        parseFloat(this.personnal_money);
      if (this.relay_loan == 1) {
        amount -= parseFloat(this.relay_loan_amount);
      }
      return amount;
    },
    relay_loan_amount: function () {
      return Math.round(this.asset_sell_price * this.percent_sell_price) / 100;
    },
    relay_loan_monthly_payment: function () {
      return (
        Math.round(
          ((this.relay_loan_amount * this.relay_loan_tx) / 100 / 12) * 100
        ) / 100
      );
    },
    max_monthly_payment: function () {
      return Math.round((this.income - this.other_expense) * 33) / 100;
    },
    mortgagor_monthly_payment_insurance_main_loan: function () {
      return (
        Math.round(
          ((this.main_loan_amount *
            this.tx_insurance_mortgagor *
            this.percent_insurance_mortgagor) /
            100 /
            100 /
            12) *
            100
        ) / 100
      );
    },
    comortgagor_monthly_payment_insurance_main_loan: function () {
      return (
        Math.round(
          ((this.main_loan_amount *
            this.tx_insurance_comortgagor *
            this.percent_insurance_comortgagor) /
            100 /
            100 /
            12) *
            100
        ) / 100
      );
    },
    mortgagor_relay_loan_monthly_payment_insurance: function () {
      return (
        Math.round(
          ((this.relay_loan_amount *
            this.tx_insurance_mortgagor *
            this.percent_insurance_mortgagor) /
            100 /
            100 /
            12) *
            100
        ) / 100
      );
    },
    comortgagor_relay_loan_monthly_payment_insurance: function () {
      return (
        Math.round(
          ((this.relay_loan_amount *
            this.tx_insurance_comortgagor *
            this.percent_insurance_comortgagor) /
            100 /
            100 /
            12) *
            100
        ) / 100
      );
    },
  },
});
