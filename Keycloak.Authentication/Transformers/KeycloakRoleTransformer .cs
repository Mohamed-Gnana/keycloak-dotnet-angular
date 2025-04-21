using Keycloak.Authentication.Extensions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Keycloak.Authentication.Transformers
{
    public class KeycloakRoleTransformer : IClaimsTransformation
    {
        private readonly string[] _rolePath = [];

        public KeycloakRoleTransformer(IConfiguration configuration)
        {
            _rolePath = configuration.GetRolePath();
        }

        public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
        {
            principal = principal.AddRoleClaim(_rolePath);
            return Task.FromResult(principal);
        }
    }
}
