import logging
import os
import random
import re
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, CallbackContext, JobQueue
from telegram.constants import ParseMode
import telegram.helpers
# Bot token and group chat ID
BOT_TOKEN = '7110011037:AAHk9B8arYfJLLYWzT59Ryl5etIU94VVzCw'
GROUP_CHAT_ID = -1002436808018

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# Function to create a regex pattern for FUD-related terms and their variations
def create_fud_regex():
    # Common FUD terms and variations that could cause problems
    fud_terms = [
        r'rug+', r'rrug+', r'ruggg+', r'rugger+', r'rugged+', r'rugging+', r'rug pull+', r'pulled rug+', r'exit rug+',
        r'dump+', r'dummp+', r'dumping+', r'dumped+', r'dumper+', r'dumpster+', r'dumped on+', r'pump and dump+',
        r'sell+', r'selling+', r'sold+', r'ssell+', r'sold off+', r'dev sell+', r'dev sold+', r'dev dumping+', r'dev selling+',
        r'farm+', r'farming+', r'farmer+', r'farmer rug+', r'farm rug+', r'farming exit+', r'farm pulled+', r'farm dump+',
        r'no dev+', r'no developer+', r'devs gone+', r'dev disappeared+', r'dev ghost+', r'dev ghosted+', r'team gone+', r'team rug+',
        r'dead project+', r'project dead+', r'dead token+', r'token dead+', r'dying project+', r'dying token+',
        r'scam+', r'scammed+', r'scammer+', r'skamm+', r'scamming+', r'exit scam+', r'ponzi+', r'ponzi scheme+',
        r'liquidity+', r'liquidity gone+', r'no liquidity+', r'liquidity pulled+', r'liquidity drain+', r'liquidity rug+', r'pull liquidity+',
        r'fake team+', r'fake dev+', r'ghosted team+', r'ghost team+', r'team disappeared+', r'devs gone+',
        r'collapse+', r'crash+', r'crashing+', r'market crash+', r'token crash+', r'coin crash+',
        r'panic+', r'panic sell+', r'panic dump+', r'panic selling+', r'panic exit+', r'sell panic+',
        r'drain+', r'drain liquidity+', r'draining+', r'liquidity drain+', r'project drained+',
        r'chart red+', r'big red+', r'plummet+', r'price plummet+', r'plummeting+',
    ]

    # Create patterns that allow flexibility between FUD terms
    fud_pattern = r'\b(?:' + r'|'.join(fud_terms) + r')\b'

    # Modify the pattern to allow combinations of these terms even if they are not next to each other
    combination_patterns = []
    for i in range(len(fud_terms)):
        for j in range(i + 1, len(fud_terms)):
            combination_patterns.append(fud_terms[i] + r'.*?' + fud_terms[j])
            combination_patterns.append(fud_terms[j] + r'.*?' + fud_terms[i])

    # Final pattern combining both individual terms and combinations of terms
    combined_pattern = r'\b(?:' + '|'.join(combination_patterns) + r'|' + fud_pattern + r')\b'

    return re.compile(combined_pattern, re.IGNORECASE)

# Create the regex pattern for detecting FUD terms and combinations
fud_pattern = create_fud_regex()

# Function to delete messages containing FUD terms or separated FUD terms
async def delete_fud_message(update: Update, context: CallbackContext) -> None:
    message = update.message.text
    if fud_pattern.search(message):
        await update.message.delete()

# Path to the single MP3 file
MP3_FILE = 'warthog.mp3'

# Function to send the single MP3 audio fragment
async def send_random_mp3(context: CallbackContext) -> None:
    chat_id = GROUP_CHAT_ID  # Use your group chat ID

    # Send the single MP3 file to the group
    try:
        await context.bot.send_audio(chat_id=chat_id, audio=open(MP3_FILE, 'rb'))
    except Exception as e:
        logging.error(f"Error sending MP3 file: {e}")


# Main function to run the bot
def main():
    # Create application
    application = Application.builder().token(BOT_TOKEN).build()

    # Register message handler to delete FUD-related messages
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, delete_fud_message))
    # Set up the JobQueue for sending random MP3s every 15 minutes
    job_queue = application.job_queue
    job_queue.run_repeating(send_random_mp3, interval=900, first=10)  # Every 15 minutes (900 seconds)

    # Start the bot
    application.run_polling()

if __name__ == '__main__':
    main()
