from agents.utils import call_openrouter_llm, get_input_from_context

def handle_llm(node, edges, context):
    prompt = get_input_from_context(node["id"], edges, context)
    return call_openrouter_llm(prompt)