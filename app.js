const ASSET_TYPE = {
  OLD: 0,
  NEW: 1,
};

const NOTARY_PERCENT_OLD = 7.9;
const NOTARY_PERCENT_NEW = 3.6;

const app = new Vue({
  el: "#app",
  data: {
    net_seller_price: 300000,
    agency_fees: 0,
    asset_type: ASSET_TYPE.OLD,

    main_loan_tx: 1.35,
    main_loan_duration: 240,

    relay_loan: 0,
    relay_loan_tx: 1.35,
    relay_loan_duration: 24,
    asset_sell_price: 100000,

    personnal_money: 0,
    income: 5500,
    other_expense: 300,
  },
  computed: {
    indebtment_rate: function() {
      return (
        Math.round(
          ((this.monthly_payment + this.other_expense) / this.income) *
            100 *
            100
        ) / 100
      );
    },
    monthly_payment: function() {
      const payment =
        (this.main_loan_amount * (this.main_loan_tx / 1200)) /
        (1 - (1 + this.main_loan_tx / 1200) ** -this.main_loan_duration);
      return Math.round(payment * 100) / 100;
    },
    notary_fees_percent: function() {
      return this.asset_type === ASSET_TYPE.OLD
        ? NOTARY_PERCENT_OLD
        : NOTARY_PERCENT_NEW;
    },
    notary_fees: function() {
      return (this.net_seller_price * this.notary_fees_percent) / 100;
    },
    main_loan_amount: function() {
      return (
        parseFloat(this.net_seller_price) -
        parseFloat(this.personnal_money) +
        parseFloat(this.notary_fees) -
        parseFloat(this.relay_loan_amount) +
        parseFloat(this.agency_fees)
      );
    },
    relay_loan_amount: function() {
      return Math.round(this.asset_sell_price * 70) / 100;
    },
    relay_loan_monthly_payment: function() {
      return (this.relay_loan_amount * this.relay_loan_tx) / 100 / 12;
    },
    max_monthly_payment: function() {
      return (this.income - this.other_expense) * 0.33;
    },
  },
});
