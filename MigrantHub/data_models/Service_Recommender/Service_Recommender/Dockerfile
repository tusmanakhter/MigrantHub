FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 8128

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY Service_Recommender/Service_Recommender.csproj Service_Recommender/
RUN dotnet restore Service_Recommender/Service_Recommender.csproj
COPY . .
WORKDIR /src/Service_Recommender
RUN dotnet build Service_Recommender.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish Service_Recommender.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Service_Recommender.dll"]
