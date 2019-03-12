FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 8060

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY Service_Recommender/Service_Rating_Model.csproj Service_Recommender/
RUN dotnet restore Service_Recommender/Service_Rating_Model.csproj
COPY . .
WORKDIR /src/Service_Recommender
RUN dotnet build Service_Rating_Model.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish Service_Rating_Model.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Service_Rating_Model.dll"]
