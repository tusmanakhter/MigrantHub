using CsvHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;

namespace servicerecommender.Models
{
    public partial class ServiceService
    {
        public readonly static int _servicesToRecommend = 6;
        public readonly static int _trendingservices = 20;
        public Lazy<List<Service>> _services = new Lazy<List<Service>>(() => LoadServiceData());
        public List<Service> _trendingServices = LoadTrendingServices();
        public readonly static string _modelpath = @".\Models\model.zip";


        public static List<Service> LoadTrendingServices() {

            var result = new List<Service>();
            
            result.Add(new Service { ServiceID = 1573, ServiceName = "Face/Off (1997)" });
            result.Add(new Service { ServiceID = 1721, ServiceName = "Titanic (1997)" });
            result.Add(new Service { ServiceID = 1703, ServiceName = "Home Alone 3 (1997)" });
            result.Add(new Service { ServiceID = 49272, ServiceName = "Casino Royale (2006)" });
            result.Add(new Service { ServiceID = 5816, ServiceName = "Harry Potter and the Chamber of Secrets (2002)" });
            result.Add(new Service { ServiceID = 3578, ServiceName = "Gladiator (2000)" });
            return result;
        }

        public string GetModelPath()
        {
            return _modelpath;
        }

        public IEnumerable<Service> GetSomeSuggestions()
        {
            var services = GetRecentServices().ToArray();

            Random rnd = new Random();
            int[] serviceselector = new int[_servicesToRecommend];
            for (int i = 0; i < _servicesToRecommend; i++)
            {
                serviceselector[i] = rnd.Next(services.Length);
            }

            return serviceselector.Select(s => services[s]);
        }

        public IEnumerable<Service> GetRecentServices()
        {
            return GetAllServices()
                .Where(m => m.ServiceName.Contains("20")
                            || m.ServiceName.Contains("198")
                            || m.ServiceName.Contains("199"));
        }

        public Service Get(int id)
        {
            return _services.Value.Single(m => m.ServiceID == id);
        }


        public IEnumerable<Service> GetAllServices()
        {
            return _services.Value;
        }

        private static List<Service> LoadServiceData()
        {
            var result = new List<Service>();
            
            Stream fileReader = File.OpenRead("Content/services.csv");

            StreamReader reader = new StreamReader(fileReader);
            try
            {
                bool header = true;
                int index = 0;
                var line = "";
                while (!reader.EndOfStream)
                {
                    if (header)
                    {
                        line = reader.ReadLine();
                        header = false;
                    }
                    line = reader.ReadLine();
                    string[] fields = line.Split(',');
                    int ServiceID = Int32.Parse(fields[0].ToString().TrimStart(new char[] { '0' }));
                    string ServiceName = fields[1].ToString();
                    result.Add(new Service() { ServiceID = ServiceID, ServiceName = ServiceName });
                    index++;
                }
            }
            finally
            {
                if (reader != null)
                {
                    reader.Dispose(); 
                }
            }

            return result;
        }
    }
}