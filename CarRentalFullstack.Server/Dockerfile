FROM node:20 AS client-build
WORKDIR /app
COPY carrentalfullstack.client/package*.json ./carrentalfullstack.client/
RUN cd carrentalfullstack.client && npm install
COPY carrentalfullstack.client ./carrentalfullstack.client
RUN cd carrentalfullstack.client && npm run build

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs

WORKDIR /src
COPY CarRentalFullstack.Server/CarRentalFullstack.Server.csproj CarRentalFullstack.Server/
COPY carrentalfullstack.client/carrentalfullstack.client.esproj carrentalfullstack.client/
RUN dotnet restore "CarRentalFullstack.Server/CarRentalFullstack.Server.csproj"
COPY . .
WORKDIR /src/CarRentalFullstack.Server
RUN dotnet build "CarRentalFullstack.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CarRentalFullstack.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false
COPY --from=client-build /app/carrentalfullstack.client/dist /app/publish/wwwroot

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "CarRentalFullstack.Server.dll"]