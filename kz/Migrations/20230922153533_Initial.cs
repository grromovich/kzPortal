using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace kz.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Articles",
                columns: table => new
                {
                    TabelCode = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ArticleType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ArticleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Period = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DayTime = table.Column<int>(type: "int", nullable: true),
                    HourTime = table.Column<int>(type: "int", nullable: true),
                    Oplacheno = table.Column<int>(type: "int", nullable: true),
                    Money = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Articles", x => x.TabelCode);
                });

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    TabelCode = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    APIkey = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.TabelCode);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    TabelCode = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BeforeDolg = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AfterDolg = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalDohod = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    APIkey = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.TabelCode);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Articles");

            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
