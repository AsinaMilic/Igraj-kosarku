namespace igraj_kosarku_be.Models
{
    public class LocationResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public double? Lat { get; set; }
        public double? Lng { get; set; }
    }
}
