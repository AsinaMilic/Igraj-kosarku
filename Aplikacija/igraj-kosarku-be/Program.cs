using BCryptNet = BCrypt.Net.BCrypt;
using igraj_kosarku_be.Helpers;
using igraj_kosarku_be.Services;
using igraj_kosarku_be.Services.Interfaces;
using System.Text;
using Microsoft.OpenApi.Models;
using System.Data.Entity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using igraj_kosarku_be;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

var appSettings = builder.Configuration.GetSection("AppSettings").Get<AppSettings>();

var key = Encoding.ASCII.GetBytes(appSettings.Secret);

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(s =>
{
    s.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please insert JWT with Bearer into field",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    s.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});
builder.Services.AddCors();
builder.Services.AddDbContext<IgrajKosarkuContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});


builder.Services
    .AddAuthentication(x =>
    {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(x =>
    {
        x.RequireHttpsMetadata = false;
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
        };
    });

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IActivityService, ActivityService>();
builder.Services.AddScoped<ICourtService, CourtService>();
builder.Services.AddScoped<ITeamService, TeamService>();
builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IStorageService, StorageService>();

var app = builder.Build();

// Configure the HTTP request pipeline.


    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseDeveloperExceptionPage();

    IgrajKosarkuContext context = new(builder.Configuration);

    if (context != null)
    {
        context.Database.EnsureCreated();
        List<Role> roles = new();

        var dbRoles = context.Roles.ToList();

        if (!dbRoles.Exists(x => x.Id == 1080))
            roles.Add(new()
            {
                Name = "Admin",
                Id = 1080
            });

        if (!dbRoles.Exists(x => x.Id == 2300))

            roles.Add(new()
            {
                Name = "Coach",
                Id = 2300
            });

        if (!dbRoles.Exists(x => x.Id == 3636))

            roles.Add(new()
            {
                Name = "Player",
                Id = 3636
            });

        context.Roles.AddRange(roles);
        context.SaveChanges();

        Location location = new()
        {
            Name = "Nis",
            Lat = 43.320904,
            Lng = 21.895760
        };

        context.Locations.Add(location);
        context.SaveChanges();


        var email = appSettings.Email;
        var password = appSettings.Password;

        if (email != null && password != null)
        {
            if (!context.Users.Any(x => x.Email == email))
            {
                User admin = new()
                {
                    Email = email,
                    FirstName = "Admin",
                    LastName = "Bre",
                    CreatedAt = DateTime.UtcNow,
                    Password = BCryptNet.HashPassword(password),
                    PhoneNumber = "+381601234567",
                    Location = context.Locations.First(l => l.Name.Equals("Nis")),
                    Role = context.Roles.First(x => x.Name == "Admin")
                };

                context.Users.Add(admin);
                context.SaveChanges();
            }
        }

        Court court = new()
        {
            ImageUrl = "https://moodle.elfak.ni.ac.rs/pluginfile.php/1/core_admin/logocompact/300x300/1640815795/ELFAK_LOGO_SR_ISPRAVAN.png",
            Location = context.Locations.First(x => x.Name == "Nis"),
            Name = "Teren kod elfak"
        };


        context.Courts.Add(court);
        context.SaveChanges();

        List<Category> categories = new()
        {
            new Category()
            {
                Text = "1 vs 1"
            },

            new Category()
            {
                Text = "2 vs 2"
            },

            new Category()
            {
                Text = "3 vs 3"
            },

            new Category()
            {
                Text = "5 vs 5"
            },

            new Category()
            {
                Text = "Casual"
            },

            new Category()
            {
                Text = "Training"
            },

            new Category()
            {
                Text = "Competition"
            }
        };

        context.Categories.AddRange(categories);
        context.SaveChanges();
    }


// global cors policy
app.UseCors(x => x
    .WithOrigins("http://localhost:3000", "https://kosarkaapi.azurewebsites.net", "https://igrajkosarku.azurewebsites.net")
    .AllowAnyMethod()
    .AllowAnyHeader());


//app.UseExceptionHandler("/api/exception");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
