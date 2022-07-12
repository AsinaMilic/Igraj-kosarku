namespace igraj_kosarku_be.Helpers
{
    public class StringHelper
    {
        public bool IsNullOrEmpty(String s)
        {
            return s == null || s.Length == 0;
        }
    }
}
