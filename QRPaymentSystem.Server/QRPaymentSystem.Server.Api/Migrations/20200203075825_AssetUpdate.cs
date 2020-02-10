using Microsoft.EntityFrameworkCore.Migrations;

namespace QRPaymentSystem.Server.Api.Migrations
{
    public partial class AssetUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Number",
                table: "Assets",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Number",
                table: "Assets");
        }
    }
}
