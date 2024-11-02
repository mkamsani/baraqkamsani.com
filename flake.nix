{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts = {
      url = "github:hercules-ci/flake-parts";
    };
    typst-packages = {
      url = "github:typst/packages";
      flake = false;
    };
  };

  outputs =
    inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [ "x86_64-linux" ];
      perSystem =
        {
          lib,
          config,
          self',
          inputs',
          pkgs,
          system,
          ...
        }:
        let
          packageJSON = builtins.fromJSON (builtins.readFile ./package.json);
          fs = lib.fileset;
          r = ./.;
          src = fs.toSource {
            root = r;
            fileset = fs.intersection (fs.fromSource (lib.sources.cleanSource r)) (
              fs.unions [
                ./src
                ./public
                (fs.fileFilter (file: file.hasExt "mts") r)
                (fs.fileFilter (file: file.hasExt "json") r)
              ]
            );
          };
        in
        {
          packages.default = pkgs.buildNpmPackage {
            pname = packageJSON.name;
            version = packageJSON.version;
            inherit src;
            npmDeps = pkgs.importNpmLock { npmRoot = src; };
            npmConfigHook = pkgs.importNpmLock.npmConfigHook;
            postInstall = ''
              cp -vf ${config.packages.resume}/resume.pdf $out/lib/node_modules/${packageJSON.name}/dist/resume.pdf
            '';
            env = {
              ASTRO_TELEMETRY_DISABLED = true;
            };
          };

          packages.resume = pkgs.stdenv.mkDerivation {
            pname = "${packageJSON.name}-resume";
            version = packageJSON.version;
            src = ./src/data/resume;
            buildInputs = [ pkgs.typst ];
            XDG_CACHE_HOME = pkgs.stdenv.mkDerivation {
              name = "typst-packages-cache";
              src = inputs.typst-packages;
              dontBuild = true;
              installPhase = ''
                mkdir -p "$out/typst"
                cp -LR --reflink=auto --no-preserve=mode -t "$out/typst" "$src"/*
              '';
            };
            TYPST_FONT_PATHS = src;
            buildCommand = builtins.readFile ./src/data/resume/_resume.sh;
            #              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            #              typst compile --pdf-standard a-2b $src/_resume.typ $out/resume.pdf
          };

          devShells.default =
            let
              packages = [
                pkgs.netlify-cli
                pkgs.nodejs
                pkgs.sops
                pkgs.yq
              ];
            in
            pkgs.mkShell {
              NIX_CONFIG = "experimental-features = nix-command flakes";
              nativeBuildInputs = packages ++ config.packages.resume.buildInputs;
            };
        };
    };
}
