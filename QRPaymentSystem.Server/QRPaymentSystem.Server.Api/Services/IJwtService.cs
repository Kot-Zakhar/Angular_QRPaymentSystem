using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;

namespace QRPaymentSystem.Server.Api.Services
{
    interface IJwtService
    {
        string GetPrivateKey();
        string GetPublicKey();
        string CreateJwtToken();
        MemoryStream GetQrImage(string payload);
    }
}
