# kids-shop
Simple Microservice assignment. 

Product Service:    
Framework, Tools and packages:  
Visual Studio 2019 
Microsoft SQL Server 
ASP.NET core (v5.0)   
 
NuGet Packages : 
- Microsoft.EntityFrameworkCore (v5.0.1) 
- Microsoft.EntityFrameworkCore.SqlServer (v5.0.1)   
- Microsoft.EntityFrameworkCore.Tools (v5.0.1)  

For running the service, at first made changes in the connection string in DatabaseContext.cs file which is inside the Database folder.   
- If you use Windows authentication in Microsoft SQL Server Management Studio, then just change the name of the server in the conn string according to your machine's server name. 
- If you use SQL Server authentication, then provide your User ID and Password along with the name of your server. (ex - Server=yourServerName;Database=KidsShop;User Id=youUserID;Password=yourPassword;)  

Create a Database name "KidsShop" in your Database.   

In Visual Studio, run the Package manager console. Run these following commands one by one.  
add-migration initial  
Update-Database  

After that, your tables will be ready in your database and you can seed the database. 
The program is ready to run now.
