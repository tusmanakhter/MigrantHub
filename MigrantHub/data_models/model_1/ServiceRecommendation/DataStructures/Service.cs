using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using ServiceRecommendation; 

namespace ServiceRecommendation.DataStructures
{
    class Service
    {
        public int serviceId;

        public String serviceTitle;

        private static String servicedatasetpath = $"{Program.DatasetsLocation}/recommendation-services.csv";

        public Lazy<List<Service>> _services = new Lazy<List<Service>>(() => LoadServiceData(servicedatasetpath));
        
        public Service()
        {
        }

        public Service Get(int id)
        {
            return _services.Value.Single(m => m.serviceId == id);
        }

        private static List<Service> LoadServiceData(String servicesdatasetpath)
        {
            var result = new List<Service>();
            Stream fileReader = File.OpenRead(servicesdatasetpath);
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
                    int serviceId = Int32.Parse(fields[0].ToString().TrimStart(new char[] { '0' }));
                    string serviceTitle = fields[1].ToString();
                    result.Add(new Service() { serviceId = serviceId, serviceTitle = serviceTitle });
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
