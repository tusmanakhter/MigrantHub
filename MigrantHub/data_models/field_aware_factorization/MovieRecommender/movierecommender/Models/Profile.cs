using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servicerecommender.Models
{
    public class Profile
    {
        public int ProfileID { get; set; }
        public string ProfileImageName { get; set;}
        public string ProfileName { get; set; }
        public List<Tuple<int,int>> ProfileServiceRatings { get; set;}
     }
}
