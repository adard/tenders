using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(tender.Startup))]
namespace tender
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
