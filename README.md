<h1 align="center">Pokemon Trainer</h1>
<h3 align="center">SPA with <a href="https://angular.io/">Angular</a></h3>
<p align="center"><em><strong>Noroff Accelerate 2023</strong> - JavaScript Assignment #3</em></p>
<p align="center">By <a href="https://github.com/MichalPajestka">Michal Pajestka</a> and <a href="https://github.com/GJRTSN">Jostein Gjertsen</a></p>
<br>

## Introduction

The Pokemon trainer app is a single-page application built with Angular, that allows users to collect and manage their Pokémon. It interacts with the PokeAPI to fetch and display Pokémon data, including images and names. Users can click on the “Collect” button to add Pokémon to their collection, which is managed through a user service. Once a Pokémon is collected, it is removed from the available catalogue/list, providing a smooth and interactive user experience. The collected Pokémon data is stored in a session storage to persist the data during a user's session.

## Figma

![angular-component-tree](/component-tree.png)

## Content

- **Landing/Login Page**: Provides a gateway to access the application by prompting users to enter their name before granting access. Successful login redirects them to the Pokémon Catalogue Page.
- **Pokemon Catalogue Page**: Displays a list of Pokémon fetched from the PokeAPI. Users can collect Pokémon from this page.
- **Pokemon Item Component**: Represents a single Pokémon in the catalogue, displaying its image and name with a collect button.
- **Trainer Page**: Here, users can view their collected Pokémon, manage their collection by removing unwanted collecitons, and log out of their account.

## Demo

The project is available for testing here: <a href="https://js-a3-pokemontrainer.vercel.app/">Live demo</a>.
