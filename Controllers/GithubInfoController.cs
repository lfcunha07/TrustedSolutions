using Microsoft.AspNetCore.Mvc;
using TrustedSolutions.Models;
using TrustedSolutions.Services;

namespace TrustedSolutions.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GithubInfoController : ControllerBase
    {
        private readonly ILogger<GithubInfoController> _logger;
        private readonly GithubInfoService _githubInfoService;

        public GithubInfoController(ILogger<GithubInfoController> logger, GithubInfoService githubInfoService)
        {
            _logger = logger;
            _githubInfoService = githubInfoService;
        }

        [HttpGet]
        [Route("GetInfo")]
        public IEnumerable<GithubInfo> Get()
        {
            return _githubInfoService.GetAllGithubInfo();
        }

        [HttpGet]
        [Route("SetInfo")]
        public async Task SetInfo() => await _githubInfoService.SetAllGithubInfo();

        [HttpGet]
        [Route("GetUsers")]
        public Task<IEnumerable<string>> GetUsers()
        {
            return _githubInfoService.GetGithubUsers();
        }

        [HttpPost]
        [Route("SetUser")]
        public async Task SetUser(UserName input) => await _githubInfoService.SetGithubUsers(input.Name);
    }
}
