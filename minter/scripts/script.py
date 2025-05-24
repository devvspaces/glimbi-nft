from PIL import Image
import random
from pathlib import Path
import json
import traceback
import shutil
from datetime import datetime

BASE_DIR = Path(__file__).resolve().parent.parent

# Path to the base folder containing all traits
ASSETS_PATH = BASE_DIR / "assets"
OUTPUT_PATH = BASE_DIR / "output"
STATE_FILE = BASE_DIR / "generator_state.json"
STATE_BACKUP_FILE = BASE_DIR / "generator_state_backup.json"
TRAITS = ["body", "cloth", "wand", "ear", "mouth", "eye"]

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
                "eye": ["Death's Omen"],
                "body": ["Lichborn Husk"],
                "wand": ["Deathbinder Scythe"],
                "ear": ["Ghoul's Horns"],
                "mouth": ["Lich's Grin"],
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

# Build TIERS with accumulated traits
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

    # Add current tier traits
    for kind in kinds:
        for trait, values in kind["traits"].items():
            traits[trait].extend([{kind["kind"]: value} for value in values])

    # Add previous tier traits (accumulation)
    if idx > 0:
        prev_tier = f"tier{idx}"
        prev_kinds = TIER_KINDS[prev_tier]
        for kind in prev_kinds:
            for trait, values in kind["traits"].items():
                traits[trait].extend([{kind["kind"]: value} for value in values])

    TIERS[tier] = traits


def load_state():
    """Load the generator state from file with backup fallback"""
    try:
        if STATE_FILE.exists():
            with open(STATE_FILE, "r") as f:
                return json.load(f)
    except Exception as e:
        print(f"Warning: Could not load main state file: {e}")
        # Try backup
        if STATE_BACKUP_FILE.exists():
            try:
                print("Attempting to load from backup state file...")
                with open(STATE_BACKUP_FILE, "r") as f:
                    state = json.load(f)
                # Restore main state file from backup
                save_state(state)
                print("Successfully restored from backup!")
                return state
            except Exception as backup_e:
                print(f"Error loading backup state file: {backup_e}")

    return {
        "next_id": 1,
        "generated_combinations": [],
        "last_update": datetime.now().isoformat(),
    }


def save_state(state, create_backup=True):
    """Save the generator state to file with atomic write"""
    state["last_update"] = datetime.now().isoformat()

    # Create backup of current state file if it exists
    if create_backup and STATE_FILE.exists():
        try:
            shutil.copy2(STATE_FILE, STATE_BACKUP_FILE)
        except Exception as e:
            print(f"Warning: Could not create backup: {e}")

    # Write to temporary file first
    temp_file = STATE_FILE.with_suffix(".tmp")
    try:
        with open(temp_file, "w") as f:
            json.dump(state, f, indent=2)

        # Atomic move
        temp_file.replace(STATE_FILE)
    except Exception as e:
        print(f"Error saving state: {e}")
        if temp_file.exists():
            temp_file.unlink()
        raise


def trait_combination_to_string(traits_dict):
    """Convert a traits dictionary to a unique string representation"""
    # Sort by trait type to ensure consistent ordering
    trait_items = []
    for trait_type in TRAITS:
        if trait_type in traits_dict:
            trait_items.append(f"{trait_type}:{traits_dict[trait_type]}")
    return "|".join(trait_items)


def get_trait_path(trait_type, trait_kind):
    return ASSETS_PATH / trait_type / f"{trait_kind}.png"


def calculate_possible_combinations(tier):
    """Calculate the total number of possible unique combinations for a tier"""
    tier_traits = TIERS[tier]
    total = 1
    for trait_type in TRAITS:
        total *= len(tier_traits[trait_type])
    return total


def check_generation_feasibility(tier, requested_count, state):
    """Check if it's possible to generate the requested number of unique NFTs"""
    # Get total possible combinations for this tier
    total_possible = calculate_possible_combinations(tier)

    # Count how many have already been generated from this tier's possible combinations
    tier_traits = TIERS[tier]
    already_generated = 0

    # Get all possible trait values for this tier
    tier_trait_values = set()
    for trait_type in TRAITS:
        for trait_dict in tier_traits[trait_type]:
            for kind, value in trait_dict.items():
                tier_trait_values.add(f"{trait_type}:{value}")

    # Check existing combinations
    for combo_str in state["generated_combinations"]:
        # Check if this combination uses only traits available in this tier
        combo_traits = set(combo_str.split("|"))
        if combo_traits.issubset(tier_trait_values):
            already_generated += 1

    available = total_possible - already_generated

    return available >= requested_count, available, total_possible


def generate_unique_nft(tier, state, used_in_batch):
    """Generate a unique NFT that hasn't been created before"""
    tier_traits = TIERS[tier]
    max_attempts = 1000

    for _ in range(max_attempts):
        # Select random traits
        selected_traits = {}
        background_kind = ""

        for trait_type in TRAITS:
            selected_trait_dict = random.choice(tier_traits[trait_type])
            kind = list(selected_trait_dict.keys())[0]
            value = list(selected_trait_dict.values())[0]

            selected_traits[trait_type] = value

            if trait_type == "cloth":
                background_kind = kind

        # Create combination string
        combo_str = trait_combination_to_string(selected_traits)

        # Check if this combination already exists
        if (
            combo_str not in state["generated_combinations"]
            and combo_str not in used_in_batch
        ):
            return selected_traits, background_kind, combo_str

    return None, None, None


def create_nft_image(selected_traits, background_kind):
    """Create the NFT image from selected traits"""
    # Get the trait kind mapping
    kind_mapping = {}
    for tier_kinds in TIER_KINDS.values():
        for kind_info in tier_kinds:
            for trait_type, values in kind_info["traits"].items():
                for value in values:
                    kind_mapping[value] = kind_info["kind"]

    # Create the composite image
    composite = Image.open(get_trait_path("background", background_kind)).convert(
        "RGBA"
    )

    # Layer traits on top
    for trait_type in TRAITS:
        trait_value = selected_traits[trait_type]
        trait_kind = kind_mapping.get(trait_value)

        if trait_kind:
            trait_file = get_trait_path(trait_type, trait_kind)
            layer = Image.open(trait_file).convert("RGBA")

            if layer.size != composite.size:
                layer = layer.resize(composite.size)

            composite = Image.alpha_composite(composite, layer)

    return composite


def safe_generate_single_nft(tier, state, used_in_batch, images_dir, metadata_dir):
    """Generate a single NFT with full error handling"""
    current_id = state["next_id"]
    image_path = images_dir / f"{current_id}.png"
    metadata_path = metadata_dir / f"{current_id}.json"

    try:
        # Generate unique NFT
        selected_traits, background_kind, combo_str = generate_unique_nft(
            tier, state, used_in_batch
        )

        if not selected_traits:
            return False, "Could not generate unique combination"

        # Create image
        nft_image = create_nft_image(selected_traits, background_kind)

        # Save image with temp file first
        nft_image.save(image_path)

        # Create metadata
        metadata = {"name": f"NFT #{current_id}", "tier": tier, "traits": []}

        for trait_type in TRAITS:
            metadata["traits"].append(
                {"trait_type": trait_type, "value": selected_traits[trait_type]}
            )

        # Save metadata with temp file first
        temp_metadata_path = metadata_path.with_suffix(".tmp")
        with open(temp_metadata_path, "w") as f:
            json.dump(metadata, f, indent=2)
        temp_metadata_path.replace(metadata_path)

        # Update state only after successful file operations
        state["generated_combinations"].append(combo_str)
        state["next_id"] += 1

        # Save state immediately after each successful NFT
        save_state(state)

        return True, combo_str

    except Exception as e:
        # Clean up any partial files
        for path in [image_path, metadata_path, metadata_path.with_suffix(".tmp")]:
            if path.exists():
                try:
                    path.unlink()
                except Exception as e:
                    print(f"ERROR: Could not delete {path}: {e}")
                    pass

        return False, f"Error generating NFT {current_id}: {str(e)}"


def generate_nfts(tier, count):
    """Generate multiple unique NFTs for a given tier with error recovery"""
    # Load current state
    state = load_state()

    # Check feasibility
    can_generate, available, total = check_generation_feasibility(tier, count, state)

    if not can_generate:
        print(f"ERROR: Cannot generate {count} unique NFTs for {tier}")
        print(f"Total possible combinations: {total}")
        print(f"Available unique combinations: {available}")
        print(f"Already generated: {total - available}")
        return

    # Create output directories
    images_dir = OUTPUT_PATH / "images"
    metadata_dir = OUTPUT_PATH / "metadata"

    try:
        images_dir.mkdir(parents=True, exist_ok=True)
        metadata_dir.mkdir(parents=True, exist_ok=True)
    except Exception as e:
        print(f"ERROR: Could not create output directories: {e}")
        return

    # Track starting ID
    start_id = state["next_id"]
    generated_count = 0
    used_in_batch = set()
    failed_attempts = 0
    max_consecutive_failures = 5

    print(f"Generating {count} unique NFTs for {tier}...")
    print(f"Starting from ID: {start_id}")

    for i in range(count):
        try:
            success, result = safe_generate_single_nft(
                tier, state, used_in_batch, images_dir, metadata_dir
            )

            if success:
                used_in_batch.add(result)
                generated_count += 1
                failed_attempts = 0  # Reset failure counter

                if generated_count % 10 == 0:
                    print(f"  Generated {generated_count}/{count} NFTs...")
            else:
                print(f"Warning: {result}")
                failed_attempts += 1

                if failed_attempts >= max_consecutive_failures:
                    print("ERROR: Too many consecutive failures. Stopping generation.")
                    break

        except KeyboardInterrupt:
            print("\nGeneration interrupted by user. Saving state...")
            break
        except Exception as e:
            print(f"ERROR during NFT generation: {e}")
            traceback.print_exc()
            failed_attempts += 1

            if failed_attempts >= max_consecutive_failures:
                print("ERROR: Too many consecutive failures. Stopping generation.")
                break

    # Final state is already saved after each NFT, but save one more time
    save_state(state)

    # Print summary
    end_id = state["next_id"] - 1
    print("\nGeneration complete!")
    print(f"Generated {generated_count} NFTs")
    print(f"ID range: {start_id} to {end_id}")
    print(f"Total NFTs in collection: {len(state['generated_combinations'])}")

    if generated_count < count:
        print(
            f"WARNING: Only generated {generated_count} out of {count} requested NFTs"
        )


def analyze_tiers():
    """Analyze and print possible combinations for each tier"""
    print("\nTier Analysis:")
    print("-" * 50)

    try:
        state = load_state()
        total_generated = len(state["generated_combinations"])

        for tier in TIERS:
            total_possible = calculate_possible_combinations(tier)
            can_generate, available, _ = check_generation_feasibility(tier, 1, state)

            print(f"\n{tier.upper()}:")
            print(f"  Total possible combinations: {total_possible}")
            print(f"  Available unique combinations: {available}")
            print(f"  Already used: {total_possible - available}")

        print(f"\nTotal NFTs generated across all tiers: {total_generated}")
        if "last_update" in state:
            print(f"Last update: {state['last_update']}")
        print("-" * 50)
    except Exception as e:
        print(f"Error analyzing tiers: {e}")


def verify_collection_integrity():
    """Verify that all generated NFTs have both image and metadata files"""
    try:
        state = load_state()
        images_dir = OUTPUT_PATH / "images"
        metadata_dir = OUTPUT_PATH / "metadata"

        print("\nVerifying collection integrity...")

        missing_images = []
        missing_metadata = []

        for i in range(1, state["next_id"]):
            if not (images_dir / f"{i}.png").exists():
                missing_images.append(i)
            if not (metadata_dir / f"{i}.json").exists():
                missing_metadata.append(i)

        if missing_images or missing_metadata:
            print("WARNING: Missing files detected!")
            if missing_images:
                print(f"  Missing images: {missing_images}")
            if missing_metadata:
                print(f"  Missing metadata: {missing_metadata}")
        else:
            print("All files verified successfully!")

    except Exception as e:
        print(f"Error verifying collection: {e}")


# Example usage
if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Usage: python script.py <tier> <count>")
        print("       python script.py verify")
        print("Example: python script.py tier1 290")
        analyze_tiers()
        sys.exit(1)

    if sys.argv[1] == "verify":
        verify_collection_integrity()
        sys.exit(0)

    if len(sys.argv) != 3:
        print("Usage: python script.py <tier> <count>")
        print("Example: python script.py tier1 290")
        sys.exit(1)

    tier = sys.argv[1]
    count = int(sys.argv[2])

    if tier not in TIERS:
        print(f"Invalid tier: {tier}")
        print(f"Valid tiers: {', '.join(TIERS.keys())}")
        sys.exit(1)

    try:
        generate_nfts(tier, count)
    except Exception as e:
        print(f"FATAL ERROR: {e}")
        traceback.print_exc()
        print("\nState has been preserved. You can run the script again to continue.")
