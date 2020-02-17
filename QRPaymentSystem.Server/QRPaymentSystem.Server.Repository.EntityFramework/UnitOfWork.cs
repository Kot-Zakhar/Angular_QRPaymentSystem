using QRPaymentSystem.Server.Repository.EntityFramework.QRDbContext;

namespace QRPaymentSystem.Server.Repository.EntityFramework
{
    public class UnitOfWork : IUnitOfWork
    {
        public IMoneyAccountRepository MoneyAccountRepository { get; protected set; }
        public IScanRepository ScanRepository { get; protected set; }
        public ITransactionRepository TransactionRepository { get; protected set; }
        public ITransactionInfoRepository TransactionInfoRepository { get; protected set; }

        private readonly QRPaymentSystemDbContext context;

        public UnitOfWork(QRPaymentSystemDbContext context) {
            this.context = context;

            MoneyAccountRepository = new MoneyAccountRepository(context);
            ScanRepository = new ScanRepository(context);
            TransactionRepository = new TransactionRepository(context);
            TransactionInfoRepository = new TransactionInfoRepository(context);
        }
     
        #region Dispose pattern

        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    MoneyAccountRepository.Dispose();
                    MoneyAccountRepository = null;
                    ScanRepository.Dispose();
                    ScanRepository = null;
                    TransactionRepository.Dispose();
                    TransactionRepository = null;
                    TransactionInfoRepository.Dispose();
                    TransactionInfoRepository = null;
                }

                disposed = true;
            }
        }

        ~UnitOfWork()
        {
          Dispose(false);
        }

        public void Dispose()
        {
            Dispose(true);
            System.GC.SuppressFinalize(this);
        }   
        #endregion
    }
}