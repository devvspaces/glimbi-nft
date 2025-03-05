from PIL import Image
import os
import random
from pathlib import Path
from uuid import uuid4

BASE_DIR = Path(__file__).resolve().parent.parent

# Path to the base folder containing all traits
ASSETS_PATH = BASE_DIR / "assets"
OUTPUT_PATH = BASE_DIR / "output"
TRAITS = ['body', 'cloth', 'wand', 'ear', 'mouth', 'eye']

TIER_KINDS = {
    "tier1": [
        {
            "kind": "hawkeye",
            "traits": {
                "eye": ["Sharpshooter Eyes"],
                "body": ["Hawkeye Form"],
                "wand": ["Hawkeye Spear"],
                "ear": ["Hawkeye Precision"],
                "mouth": ["Deadeye Snarl"],
                "cloth": ["Hawkeye Cloak"],
            },
        },
        {
            "kind": "volt",
            "traits": {
                "eye": ["Lightning Glare"],
                "body": ["Stormcharged Form"],
                "wand": ["Stormcaller Cane"],
                "ear": ["Thunder Sparks"],
                "mouth": ["Thunderbite"],
                "cloth": ["Stormsurge Robe"],
            },
        },
        {
            "kind": "ice",
            "traits": {
                "eye": ["Frostborn Gaze"],
                "body": ["Glacial Armor"],
                "wand": ["Frostbite Scepter"],
                "ear": ["Frozen Peaks"],
                "mouth": ["Frozen Fang"],
                "cloth": ["Glacial Veil"],
            },
        },
        {
            "kind": "stone",
            "traits": {
                "eye": ["Terra Watch"],
                "body": ["Terra Golem"],
                "wand": ["Terra Totem"],
                "ear": ["Earthborn Ridge"],
                "mouth": ["Earthen Jaw"],
                "cloth": ["Terra Cloak"],
            },
        },
    ],
    "tier2": [
        {
            "kind": "venom",
            "traits": {
                "eye": ["Venomous Sight"],
                "body": ["Toxic Exoskeleton"],
                "wand": ["Toxic Fang Wand"],
                "ear": ["Toxic Spikes"],
                "mouth": ["Venomfang Snarl"],
                "cloth": ["Toxic Drape"],
            },
        },
        {
            "kind": "light",
            "traits": {
                "eye": ["Celestial Shine"],
                "body": ["Aurora Essence"],
                "wand": ["Holy Beacon"],
                "ear": ["Holy Radiance"],
                "mouth": ["Luminous Grin"],
                "cloth": ["Holy Raiment"],
            },
        },
        {
            "kind": "inferno",
            "traits": {
                "eye": ["Infernal Vision"],
                "body": ["Emberborn Flesh"],
                "wand": ["Infernal Rod"],
                "ear": ["Blazing Arcane"],
                "mouth": ["Flame Maw"],
                "cloth": ["Infernal Mantle"],
            },
        },
    ],
    "tier3": [
        {
            "kind": "void",
            "traits": {
                "eye": ["Abyssal Glint"],
                "body": ["Shadow Veil"],
                "wand": ["Voidborn Staff"],
                "ear": ["Abyssal Tips"],
                "mouth": ["Phantom Howl"],
                "cloth": ["Abyssal Wraith"],
            },
        },
        {
            "kind": "death",
            "traits": {
                "eye": ["Death’s Omen"],
                "body": ["Lichborn Husk"],
                "wand": ["Deathbinder Scythe"],
                "ear": ["Ghoul’s Horns"],
                "mouth": ["Lich’s Grin"],
                "cloth": ["Shroud of the Damned"],
            },
        },
    ],
    "tier4": [
        {
            "kind": "arcana",
            "traits": {
                "eye": ["Runic Insight"],
                "body": ["Runic Guardian"],
                "wand": ["Runebound Relic"],
                "ear": ["Eldritch Crests"],
                "mouth": ["Arcane Chant"],
                "cloth": ["Arcane Insignia"],
            },
        }
    ],
}

TIERS = {}

for idx, (tier, kinds) in enumerate(TIER_KINDS.items()):
    traits = {
        "eye": [],
        "body": [],
        "wand": [],
        "ear": [],
        "mouth": [],
        "cloth": [],
    }
    for kind in kinds:
        for trait, values in kind["traits"].items():
            traits[trait].extend([{kind['kind']: value} for value in values])

    if idx > 0:
        prev_kinds = TIER_KINDS[f"tier{idx}"]
        for kind in prev_kinds:
            for trait, values in kind["traits"].items():
                traits[trait].extend([{kind['kind']: value} for value in values])
    
    TIERS[tier] = traits


def get_trait_path(trait_type, trait_kind):
    return ASSETS_PATH / trait_type / f'{trait_kind}.png'

def generate_nft(tier):
    # Create output directory if it doesn't exist
    os.makedirs(OUTPUT_PATH, exist_ok=True)
    
    tier_traits = TIERS[tier]
    
    background_kind = ""

    # Select one random trait from each category
    selected_traits = []
    for trait_type in TRAITS:
        selected_trait = random.choice(tier_traits[trait_type])
        if trait_type == "cloth":
            background_kind = list(selected_trait.keys())[0]
        selected_traits.append(selected_trait)

    # Create the composite image
    # Start with the background trait as our base
    composite = Image.open(get_trait_path("background", background_kind)).convert("RGBA")

    # Layer remaining traits on top
    for idx, kind_trait in enumerate(selected_traits):
        kind = list(kind_trait.keys())[0]
        trait_file = get_trait_path(TRAITS[idx], kind)
        layer = Image.open(trait_file).convert("RGBA")

        # Ensure the layer is the same size as our composite
        if layer.size != composite.size:
            layer = layer.resize(composite.size)

        # Paste the layer onto our composite
        composite = Image.alpha_composite(composite, layer)

    # Save the resulting image
    uid = uuid4().hex
    nft_filename = f"nft_{uid}.png"
    composite.save(OUTPUT_PATH / nft_filename)

    # Also save metadata
    metadata = {
        "name": f"NFT #{uid}",
        "traits": [],
    }
    for idx, kind_trait in enumerate(selected_traits):
        value = list(kind_trait.values())[0]
        metadata["traits"].append({
            "trait_type": TRAITS[idx],
            "value": value
        })
    
    return nft_filename, metadata


# Example usage
if __name__ == "__main__":
    file, meta = generate_nft("tier4")
    print(file, meta)
