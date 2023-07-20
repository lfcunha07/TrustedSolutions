using System.Text.Json;
using TrustedSolutions.Models;

namespace TrustedSolutions.Repositories
{
    public class GithubInfoRepository
    {

        public string UsersFilePath = "processar/nomes_data_horario.txt";
        public string DataFilePath = "processado/dados.txt";
        public IEnumerable<GithubInfo> GetAllGithubInfo()
        {
            var githubInfoList = new List<GithubInfo>();

            try
            {
                foreach (var line in File.ReadLines(DataFilePath))
                {
                    var options = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    };
                    var githubInfo = JsonSerializer.Deserialize<GithubInfo>(line, options);
                    githubInfoList.Add(githubInfo);
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }

            return githubInfoList;
        }

        public async Task SetAllGithubInfo(string input)
        {
            try
            {
                using (var writer = new StreamWriter(DataFilePath, true))
                {
                    await writer.WriteAsync(input);
                    await writer.WriteLineAsync();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }
        
        public Task<IEnumerable<string>> GetGithubUsers()
        {
            string[] users = ReadTextFileToArray(UsersFilePath);
            return Task.FromResult<IEnumerable<string>>(users);;
        }

        public async Task SetGithubUsers(string input)
        {
            try
            {
                using (var writer = new StreamWriter(UsersFilePath, true))
                {
                    await writer.WriteAsync(input);
                    await writer.WriteLineAsync();
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }

        public void EraseFileContent(string filePath)
        {
            if (File.Exists(filePath))
            {
                File.WriteAllText(filePath, string.Empty);
            }
        }

        public string[] ReadTextFileToArray(string filePath)
        {
            try
            {
                string[] lines = File.ReadAllLines(filePath);
                return lines;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading file '{filePath}': {ex.Message}");
                return new string[0];
            }
        }
    }
}
