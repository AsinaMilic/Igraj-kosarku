using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace igraj_kosarku_be
{
    public class IgrajKosarkuContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Team> Teams { get; set; } = null!;
        public DbSet<Court> Courts { get; set; } = null!;
        public DbSet<Location> Locations { get; set; } = null!;
        public DbSet<Activity> Activities { get; set; } = null!;
        public DbSet<Role> Roles { get; set; } = null!;
        public DbSet<Comment> Comments { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<Rating> Ratings { get; set; } = null!;

        private readonly IConfiguration _configuration;

        public IgrajKosarkuContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = _configuration.GetConnectionString("DefaultConnection");
                if (connectionString == null || connectionString.Length == 0)
                {
                    throw new Exception("connectionString is null or empty");
                }
                optionsBuilder
                    .UseSqlite(connectionString);
            }
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().Property(b => b.CreatedAt).HasDefaultValue(DateTime.UtcNow);
            modelBuilder.Entity<User>().HasIndex(u => u.ProfileName).IsUnique();
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<Comment>().Property(b => b.CreatedAt).HasDefaultValue(DateTime.UtcNow);

        }

    }

    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? ProfileName { get; set; } = null!;
        public string Email { get; set; } = null!;
        [JsonIgnore]
        public string Password { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public int? LocationId { get; set; }
        public Location? Location { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Status { get; set; }
        public string? Description { get; set; }
        public string? Specialties { get; set; }
        public string? ResetPasswordToken { get; set; }
        public string? ImageUrl { get; set; }
        public virtual List<Team> Teams { get; set; } = null!;
        public virtual Role Role { get; set; } = null!;

        public User()
        {
            Teams = new List<Team>();
        }
    }

    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Color { get; set; } = null!;//dodao Aleksa
        public int CreatedByUserId { get; set; }
        public virtual List<User> Users { get; set; } = null!;

        public Team()
        {
            Users = new List<User>();
        }
    }

    public class Court
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int LocationId { get; set; }
        public Location Location { get; set; } = null!;
        public string ImageUrl { get; set; } = null!;
        public List<Activity> Activities { get; set; } = null!;
        public Court()
        {
            Activities = new List<Activity>();
        }
    }

    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public List<Activity> Activities { get; set; } = null!;
        public double? Lat { get; set; }
        public double? Lng { get; set; }

        public Location()
        {
            Activities = new List<Activity>();
        }
    }

    public class Activity
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int LocationId { get; set; }
        public Location Location { get; set; } = null!;
        public int CreatedByUserId { get; set; }
        public User CreatedByUser { get; set; } = null!;
        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime ActivityDateTime { get; set; }
        public int NumberOfPlayers { get; set; }
        public int CourtId { get; set; }
        public Court? Court { get; set; }
        public string? Url { get; set; }
        public virtual List<Comment> Comments { get; set; } = null!;
        public virtual List<Team> Teams { get; set; } = null!;
        public virtual List<Rating> Ratings { get; set; } = null!;
        public Activity()
        {
            Comments = new List<Comment>();
            Teams = new List<Team>();
            Ratings = new List<Rating>();
        }
    }

    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public virtual List<User> Users { get; set; } = null!;
        public Role()
        {
            Users = new List<User>();
        }
    }

    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public int ActivityId { get; set; }
        public Activity Activity { get; set; } = null!;
        public int CreatedByUserId { get; set; }
        public User CreatedByUser { get; set; } = null!;
    }

    public class Category
    {
        public int Id { get; set; }
        public string Text { get; set; } = null!;
    }

    public class Rating
    {
        public int Id { get; set; }
        public int CreatedByUserId { get; set; }
        public User CreatedByUser { get; set; } = null!;
        public int ActivityId { get; set; }
        public Activity Activity { get; set; } = null!;
        [Range(1, 5)]
        public int Rated { get; set; }
    }
}