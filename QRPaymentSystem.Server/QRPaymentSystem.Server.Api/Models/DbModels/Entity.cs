using System;
using System.ComponentModel.DataAnnotations;

namespace QRPaymentSystem.Server.Api.Models.DbModels
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

        [Required]
        public Guid Id { get; set; }
    }
}
