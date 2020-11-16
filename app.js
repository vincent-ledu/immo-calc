const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

var app = new Vue({
  el: "#app",
  data: {
    asset_price: formatter.format(820000),
    personnal_money: 50000,
    asset_sell_price: 400000,
    main_loan_amount: 420000,
    main_loan_tx: 1.35,
    main_loan_duration: 240,
    relay_loan: false,
    relay_loan_amount: 173000,
    relay_loan_tx: 1.35,
    relay_loan_duration: 24,

    notary_fees: 65600,
    notary_fees_percent: 7.9,

    income: 5500,
    other_expense: 300,
    indebtment_rate: 27.8,

    monthly_payment: 0,
  },
  watch: {
    asset_price: function(newPrice, oldPrice) {
      // this.main_loan_amount = "Computing...";
      // this.monthly_payment = "Computing...";
      this.notary_fees = (this.asset_price * this.notary_fees_percent) / 100;
      this.main_loan_amount =
        this.asset_price - this.personnal_money + this.notary_fees;

      const m =
        (this.main_loan_amount * (this.main_loan_tx / 1200)) /
        (1 - (1 + this.main_loan_tx / 1200) ** -this.main_loan_duration);

      this.monthly_payment = Math.round(m * 100) / 100;

      this.indebtment_rate =
        ((this.monthly_payment + this.other_expense) / this.income) * 100;
    },
    notary_fees_percent: function(newPercent, newPercent) {
      this.notary_fees = (this.asset_price * this.notary_fees_percent) / 100;
      this.main_loan_amount =
        this.asset_price - this.personnal_money + this.notary_fees;

      const m =
        (this.main_loan_amount * (this.main_loan_tx / 1200)) /
        (1 - (1 + this.main_loan_tx / 1200) ** -this.main_loan_duration);

      this.monthly_payment = Math.round(m * 100) / 100;

      this.indebtment_rate =
        ((this.monthly_payment + this.other_expense) / this.income) * 100;
    },
    methods: {},
  },
});
