# kids-shop
Simple Microservice assignment. 

# Product Service:    
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

Create a Database named "KidsShop" in your Database.   

Delete the Migrations folder from "ProductMicroservice\ProductService".

In Visual Studio, run the Package manager console. Run these following commands one by one.  
> add-migration initial  
> Update-Database  

After that, your tables will be ready in your database and you can seed the database.   
The program is ready to run now.   
 
# Rating Service:   

- Language: node.js   
- Database: firebase  

Firebase setup:    
Create a project and a firestore database. Then go to project settings -> register a web app.   

Environment setup:   
Open a new folder named ‘RatingService’ in Visual Studio code. Then write these commands into the terminal.   
> firebase init  

After login to firebase account.   
Choose ‘Functions: Configure and deploy cloud functions’ features for the project.   
Choose an existing project. Then select the project.   
Then choose javascript.   
Use ESLint.  
Install all necessary npm dependencies   
> npm install express cors axios   
> npm install apisauce --save   

Copy and replace the index.js file from “Rating service/functions” in the newly created RatingService/functions folder.   
  
Go to firebase app settings -> service accounts -> generate a new private key   
Save the json file and rename it to permission.json. Then copy the file into functions folder.   
  
To run the program   
> cd functions   
> npm run serve   

Check this screenshot. These are the running firebase emulators that connect the app.   
https://drive.google.com/file/d/1GfvvrAaxgN1DwoVMzKYj4EwUHt655c_I/view   
 
The base url is: http://localhost:5001/ratingservice-9d982/us-central1/app   

Endpoint: ‘/products’ is for getting the product list from product service     
Endpoint: ‘/rate’ is for post rating in rating service and updating the average rating and the number of raters in product service after 5 post(rating).   

