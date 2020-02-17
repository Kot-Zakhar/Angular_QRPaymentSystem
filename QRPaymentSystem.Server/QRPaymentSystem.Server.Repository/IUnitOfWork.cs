using System;

namespace QRPaymentSystem.Server.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        IMoneyAccountRepository MoneyAccountRepository { get; }
        IScanRepository ScanRepository { get; }
        ITransactionRepository TransactionRepository { get; }
        ITransactionInfoRepository TransactionInfoRepository { get; }
    }
}