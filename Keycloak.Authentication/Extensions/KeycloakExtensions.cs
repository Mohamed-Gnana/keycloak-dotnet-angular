using Keycloak.Authentication.Models;
using Keycloak.Authentication.Transformers;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Security.Claims;
using System.Text.Json;

namespace Keycloak.Authentication.Extensions
{
    public static class KeycloakExtensions
    {
        public static IServiceCollection AddKeycloakTransformation(this IServiceCollection services)
        {
            services.AddScoped<IClaimsTransformation, KeycloakRoleTransformer>();
            return services;
        }

        public static IServiceCollection AddKeycloakAuthentication(
            this IServiceCollection services,
            IConfiguration configuration,
            bool transformerOn = false)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = configuration.GetKeycloakConfigurations().Authority;
                    options.Audience = configuration.GetKeycloakConfigurations().Audience;

                    if (configuration.GetRolePath().Length == 1)
                    {
                        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                        {
                            RoleClaimType = configuration.GetKeycloakConfigurations().RoleClaim
                        };
                    }

                    else if (configuration.GetRolePath().Length > 1 && !transformerOn)
                    {
                        options.Events = new JwtBearerEvents
                        {
                            OnTokenValidated = context =>
                            {
                                if (context.Principal is null) return Task.CompletedTask;
                                context.Principal = context.Principal?.AddRoleClaim(configuration.GetRolePath());
                                return Task.CompletedTask;
                            }
                        };
                    }

                    if (!string.IsNullOrEmpty(options.Authority) && !options.Authority.StartsWith("https"))
                    {
                        options.RequireHttpsMetadata = false;
                    }
                });

            return services;
        }
        public static ClaimsPrincipal AddRoleClaim(this ClaimsPrincipal principal, string[] rolePath)
        {
            if(principal.Identity is ClaimsIdentity identity)
            {
                if(rolePath.Length <= 1) return principal;
                var root = identity.FindFirst(rolePath[0]);
                if(root is not null)
                {
                    try
                    {
                        using var doc = JsonDocument.Parse(root.Value);
                        var current = doc.RootElement;

                        for(int i = 1; i < rolePath.Length; i++)
                        {
                            if (!current.TryGetProperty(rolePath[i], out current))
                                return principal;
                        }

                        if(current.ValueKind is JsonValueKind.String)
                        {
                            AddClaimFromStringElement(identity, current);
                        }

                        else if(current.ValueKind is JsonValueKind.Array)
                        {
                            foreach(var role in current.EnumerateArray())
                            {
                                AddClaimFromStringElement(identity, role);
                            }
                        }

                    }
                    catch (Exception)
                    {
                        return principal;
                    }
                }
            }
            return principal;
        }

        private static void AddClaimFromStringElement(ClaimsIdentity identity, JsonElement current)
        {
            var roleValue = current.GetString();
            if (!string.IsNullOrEmpty(roleValue) && !identity.HasClaim(ClaimTypes.Role, roleValue))
            {
                identity.AddClaim(new Claim(ClaimTypes.Role, roleValue));
            }
        }

        public static string[] GetRolePath(this IConfiguration configuration)
        {
            return string.IsNullOrEmpty(configuration.GetKeycloakConfigurations().RoleClaim) ?
                   "realm_access.roles".Split('.') :
                   configuration.GetKeycloakConfigurations().RoleClaim.Split('.');
        }

        public static KeycloakConfigurations GetKeycloakConfigurations(this IConfiguration configuration)
        {
            return configuration.GetSection("Keycloak").Get<KeycloakConfigurations>() ?? new();
        }
    }
}
