using System;

namespace QRPaymentSystem.Server.Domain.Models
{
    public class Entity
    {
        public Entity()
        {
            Id = Guid.NewGuid();
        }
        public Entity(Guid Id)
        {
            this.Id = Id;
        }

        public Guid Id { get; set; }
    }
}
