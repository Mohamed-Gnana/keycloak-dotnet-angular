using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keycloak.Authentication.Models
{
    public class KeycloakConfigurations
    {
        public string Authority { get; set; } = default!;
        public string Audience { get; set; } = default!;
        public string RoleClaim { get; set; } = default!;
    }
}
