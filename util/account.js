const accounts = {
    data: [
      {
        name: "DANIEL BENSON",
        account_no: "0239404949",
        bank_code: "001",
      },
      {
        name: "FRANK LAMPARD",
        account_no: "09291930439",
        bank_code: "002",
      },
      {
        name: "MARK ZUCKERBERG",
        account_no: "0432934930",
        bank_code: "001",
      },
      {
        name: "ELON MUSK",
        account_no: "0933434920",
        bank_code: "002",
      },
      {
        name: "VICTOR OSIMHEN",
        account_no: "0239201394",
        bank_code: "003",
      },
    ],
  };

  const getAccount = ({ account_no, bank_code }) =>
    accounts?.data?.find(
      (item) => item.bank_code === bank_code && item.account_no === account_no
    );

  module.exports = getAccount
