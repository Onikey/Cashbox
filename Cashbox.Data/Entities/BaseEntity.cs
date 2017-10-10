using System;

namespace Cashbox.Data.Entities
{
    public abstract class BaseEntity
    {
        public BaseEntity(Guid id)
        {
            if (Guid.Equals(id, default(Guid)))
                throw new ArgumentException("The id can't be the default value.");

            this.Id = id;
        }
        public BaseEntity()
        {

        }
        public Guid Id { get; set; }
    }
}
