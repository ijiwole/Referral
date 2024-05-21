const getAccount = require('../util/account');
const {StatusCodes} = require("http-status-codes");
const transferFund = require('../util/transfer');

const withdrawBalance = async(req, res) => {
    const user = req.headers;
    const {amount, account_no, bank_code } = req.body;

    if(!amount){
        res.status(StatusCodes.BAD_REQUEST).json({
            message: 'amount not provided'
        });
    }

    if(isNaN(amount)){
        res.status(StatusCodes.BAD_REQUEST).json({
            message: 'amount provided is not a number'
        });
    }

    if(!account_no){
        res.status(StatusCodes.BAD_REQUEST).json({
            message: 'account_no not provided'
        });
    }

    if(!bank_code){
        res.status(StatusCodes.BAD_REQUEST).json({
            message: 'bank_code not provided'
        });
    }

    try{
        if(amount > user.balance){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "account balance is lower than the amount to be withdrawn"
            })
        }
        const validateAccountDetails = getAccount({ account_no, bank_code });

        if(!validateAccountDetails){
            res.status(StatusCodes.NOT_FOUND).json({
                message: 'account details provided not valid'
            });
        }

        const transfer = await transferFund({amount, account_no, bank_code});

        if(transfer.status !== 200){
            res.status(StatusCodes.BAD_REQUEST).json({
                message: `transfer failed ${transfer.message}`,
            })
        }

        user.balance -= amount;
        await user.save();

        res.status(StatusCodes.OK).json({
            message: `transfer processed successfully`,
            data: transfer.message
        });
    }catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: `internal server error ${err.message}`,
        })
    }
}

module.exports = {
    withdrawBalance
}
