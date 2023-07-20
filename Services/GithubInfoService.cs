using TrustedSolutions.Models;
using TrustedSolutions.Repositories;

namespace TrustedSolutions.Services
{
    public class GithubInfoService
    {
        private readonly GithubInfoRepository _githubInfoRepository;
        private readonly HttpClient _httpClient;

        public GithubInfoService()
        {
            _githubInfoRepository = new GithubInfoRepository();
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Add("User-Agent", "TrustedSolutionsApp");
        }

        public IEnumerable<GithubInfo> GetAllGithubInfo()
        {
            return _githubInfoRepository.GetAllGithubInfo();
        }

        public async Task SetAllGithubInfo()
        {
            IEnumerable<string> users = await GetGithubUsers();
            
            foreach (string user in users)
            {
                string githubInfo = await GetGithubUserInfo(user);
                if(githubInfo == null)
                {
                    continue;
                }
                await _githubInfoRepository.SetAllGithubInfo(githubInfo);
            }
            
            if (users.Count() > 0)
            {
                string usersFilePath = _githubInfoRepository.UsersFilePath;
                _githubInfoRepository.EraseFileContent(usersFilePath);
            }
        }

        public async Task<IEnumerable<string>> GetGithubUsers()
        {
            return await _githubInfoRepository.GetGithubUsers();
        }

        public async Task SetGithubUsers(string input)
        {
            await _githubInfoRepository.SetGithubUsers(input);
        }
        
        public async Task<string> GetGithubUserInfo(string user)
        {
            string apiUrl = $"https://api.github.com/users/{user}";
            HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                string jsonResponse = await response.Content.ReadAsStringAsync();
                return jsonResponse;
            }
            return null;
        }
    }
}

