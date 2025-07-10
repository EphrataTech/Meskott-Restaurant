from typing import Optional, List
from huggingface_hub import InferenceClient
from langchain_core.language_models import LLM
from langchain_core.pydantic_v1 import PrivateAttr
from app.system_prompt import get_system_prompt


class CustomHuggingFaceLLM(LLM):
    hf_token: str
    repo_id: str
    temperature: float = 0.7
    max_new_tokens: int = 512
    repetition_penalty: float = 1.1
    stop_sequences: Optional[List[str]] = None

    _client: InferenceClient = PrivateAttr()

    def __init__(self, **data):
        super().__init__(**data)
        self.stop_sequences = self.stop_sequences or ["</s>"]
        # Set repo_id as model during client creation to avoid StopIteration
        self._client = InferenceClient(model=self.repo_id, token=self.hf_token)

    @property
    def _llm_type(self) -> str:
        return "custom_huggingface_llm"

    def _call(self, prompt: str, stop: Optional[List[str]] = None) -> str:
        stop = stop or self.stop_sequences

        try:
            is_chat_model = any(
                keyword in self.repo_id.lower()
                for keyword in ["chat", "llama", "zephyr", "conversational"]
            )

            if is_chat_model:
                response = self._client.chat_completion(
                    messages=[
                        {"role": "system", "content": get_system_prompt()},
                        {"role": "user", "content": prompt}
                    ],
                    temperature=self.temperature,
                    max_tokens=self.max_new_tokens,
                    stop=stop
                )
                print("[LLM Chat Response]", response)
                return response.choices[0].message["content"]
            else:
                response = self._client.text_generation(
                    prompt=prompt,
                    temperature=self.temperature,
                    max_new_tokens=self.max_new_tokens,
                    repetition_penalty=self.repetition_penalty,
                    stop=stop,
                    do_sample=True,
                    return_full_text=False,
                )
                print("[LLM Text Response]", response)
                return response.generated_text

        except Exception as e:
            import traceback
            print("[Custom LLM ERROR]", e)
            traceback.print_exc()
            raise e
